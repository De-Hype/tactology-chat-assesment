"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const chat_service_1 = require("./chat.service");
const user_service_1 = require("../users/user.service");
let ChatGateway = class ChatGateway {
    constructor(jwtService, chatService, userService) {
        this.jwtService = jwtService;
        this.chatService = chatService;
        this.userService = userService;
        this.connectedUsers = new Map();
        this.userRooms = new Map();
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token ||
                client.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const payload = this.jwtService.verify(token);
            const user = await this.userService.findById(payload.sub);
            if (!user) {
                throw new websockets_1.WsException('User not found');
            }
            this.connectedUsers.set(client.id, {
                userId: user.id,
                username: user.username,
            });
            console.log(`Client connected: ${user.username}`);
        }
        catch (error) {
            console.error('Connection error:', error.message);
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        const user = this.connectedUsers.get(client.id);
        const room = this.userRooms.get(client.id);
        if (user && room) {
            const message = await this.chatService.leaveRoom(user.username, room);
            this.server.to(room).emit('message', message);
        }
        this.connectedUsers.delete(client.id);
        this.userRooms.delete(client.id);
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleJoinRoom(client, payload) {
        try {
            const user = this.connectedUsers.get(client.id);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const { room } = payload;
            const previousRoom = this.userRooms.get(client.id);
            if (previousRoom) {
                client.leave(previousRoom);
                const leaveMessage = await this.chatService.leaveRoom(user.username, previousRoom);
                this.server.to(previousRoom).emit('message', leaveMessage);
            }
            client.join(room);
            this.userRooms.set(client.id, room);
            const joinMessage = await this.chatService.joinRoom(user.username, room);
            this.server.to(room).emit('message', joinMessage);
            return {
                event: 'message',
                data: joinMessage.systemMessage,
            };
        }
        catch (error) {
            throw new websockets_1.WsException(error.message);
        }
    }
    async handleSendMessage(client, payload) {
        try {
            const user = this.connectedUsers.get(client.id);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const room = this.userRooms.get(client.id);
            if (!room) {
                throw new websockets_1.WsException('Not in a room');
            }
            const { text } = payload;
            const message = this.chatService.createMessage(user.username, text, room);
            this.server.to(room).emit('message', message);
            return {
                event: 'message',
                data: message,
            };
        }
        catch (error) {
            throw new websockets_1.WsException(error.message);
        }
    }
    async handleLeaveRoom(client) {
        try {
            const user = this.connectedUsers.get(client.id);
            if (!user) {
                throw new websockets_1.WsException('Unauthorized');
            }
            const room = this.userRooms.get(client.id);
            if (!room) {
                throw new websockets_1.WsException('Not in a room');
            }
            client.leave(room);
            this.userRooms.delete(client.id);
            const message = await this.chatService.leaveRoom(user.username, room);
            this.server.to(room).emit('message', message);
            return {
                event: 'message',
                data: message.systemMessage,
            };
        }
        catch (error) {
            throw new websockets_1.WsException(error.message);
        }
    }
    handleGetActiveUsers(client) {
        try {
            const room = this.userRooms.get(client.id);
            if (!room) {
                throw new websockets_1.WsException('Not in a room');
            }
            const activeUsers = this.chatService.getActiveUsers(room);
            return {
                event: 'activeUsers',
                data: activeUsers,
            };
        }
        catch (error) {
            throw new websockets_1.WsException(error.message);
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getActiveUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleGetActiveUsers", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        chat_service_1.ChatService,
        user_service_1.UserService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map
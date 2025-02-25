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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("../room/room.service");
let ChatService = class ChatService {
    constructor(roomService) {
        this.roomService = roomService;
        this.activeUsers = new Map();
        this.roomService.create('General').catch((err) => {
            if (err.code !== '23505') {
                console.error('Error creating default room:', err);
            }
        });
    }
    async joinRoom(username, roomName) {
        await this.roomService.findOneByName(roomName);
        if (!this.activeUsers.has(roomName)) {
            this.activeUsers.set(roomName, new Set());
        }
        this.activeUsers.get(roomName).add(username);
        return {
            sender: 'System',
            systemMessage: `${username} joined the room`,
            timestamp: new Date().toISOString(),
            room: roomName,
        };
    }
    async leaveRoom(username, roomName) {
        await this.roomService.findOneByName(roomName);
        if (this.activeUsers.has(roomName)) {
            this.activeUsers.get(roomName).delete(username);
        }
        return {
            sender: 'System',
            systemMessage: `${username} left the room`,
            timestamp: new Date().toISOString(),
            room: roomName,
        };
    }
    getActiveUsers(roomName) {
        if (!this.activeUsers.has(roomName)) {
            return [];
        }
        return Array.from(this.activeUsers.get(roomName));
    }
    createMessage(sender, text, roomName) {
        return {
            sender,
            text,
            timestamp: new Date().toISOString(),
            room: roomName,
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], ChatService);
//# sourceMappingURL=chat.service.js.map
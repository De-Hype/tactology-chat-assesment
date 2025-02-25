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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const message_response_1 = require("./dto/message.response");
const join_room_input_1 = require("./dto/join-room.input");
const leave_room_input_1 = require("./dto/leave-room.input");
const send_message_input_1 = require("./dto/send-message.input");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const chat_service_1 = require("./chat.service");
const pubSub = new graphql_subscriptions_1.PubSub();
let ChatResolver = class ChatResolver {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async joinRoom(joinRoomInput, user) {
        const { room } = joinRoomInput;
        const message = await this.chatService.joinRoom(user.username, room);
        pubSub.publish(`room_${room}`, { roomMessages: message });
        return message;
    }
    async leaveRoom(leaveRoomInput, user) {
        const { room } = leaveRoomInput;
        const message = await this.chatService.leaveRoom(user.username, room);
        pubSub.publish(`room_${room}`, { roomMessages: message });
        return message;
    }
    async sendMessage(sendMessageInput, user) {
        const { text, room } = sendMessageInput;
        const message = this.chatService.createMessage(user.username, text, room);
        pubSub.publish(`room_${room}`, { roomMessages: message });
        return message;
    }
    activeUsers(room) {
        return this.chatService.getActiveUsers(room);
    }
};
exports.ChatResolver = ChatResolver;
__decorate([
    (0, graphql_1.Mutation)(() => message_response_1.MessageResponse),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('joinRoomInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_room_input_1.JoinRoomInput, Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "joinRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_response_1.MessageResponse),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('leaveRoomInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leave_room_input_1.LeaveRoomInput, Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "leaveRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_response_1.MessageResponse),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('sendMessageInput')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_input_1.SendMessageInput, Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "sendMessage", null);
__decorate([
    (0, graphql_1.Query)(() => [String]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('room')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], ChatResolver.prototype, "activeUsers", null);
exports.ChatResolver = ChatResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatResolver);
//# sourceMappingURL=chat.resolver.js.map
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
exports.RoomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const room_service_1 = require("./room.service");
const room_entity_1 = require("./entities/room.entity");
let RoomResolver = class RoomResolver {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async rooms() {
        return this.roomService.findAll();
    }
    async createRoom(name) {
        return this.roomService.create(name);
    }
};
exports.RoomResolver = RoomResolver;
__decorate([
    (0, graphql_1.Query)(() => [room_entity_1.Room]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "rooms", null);
__decorate([
    (0, graphql_1.Mutation)(() => room_entity_1.Room),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "createRoom", null);
exports.RoomResolver = RoomResolver = __decorate([
    (0, graphql_1.Resolver)(() => room_entity_1.Room),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomResolver);
//# sourceMappingURL=room.resolver.js.map
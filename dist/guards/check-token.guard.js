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
exports.CheckTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
let CheckTokenGuard = class CheckTokenGuard {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.MS_IAM_URL = 'http://localhost:3000';
    }
    async canActivate(context) {
        var _a;
        try {
            const request = context.switchToHttp().getRequest();
            const token = (_a = request.headers[`authorization`]) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`${this.configService.get(this.MS_IAM_URL)}/auth/check-token`, { headers: { authorization: `Bearer ${token}` } }));
            return response.data.isValid;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.CheckTokenGuard = CheckTokenGuard;
exports.CheckTokenGuard = CheckTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], CheckTokenGuard);
//# sourceMappingURL=check-token.guard.js.map
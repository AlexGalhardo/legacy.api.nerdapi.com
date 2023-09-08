"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const Contact_controller_1 = require("../Controllers/Contact.controller");
const ContactSendMessage_useCase_1 = require("../UseCases/ContactSendMessage.useCase");
let ContactModule = class ContactModule {
};
exports.ContactModule = ContactModule;
exports.ContactModule = ContactModule = __decorate([
    (0, common_1.Module)({
        controllers: [Contact_controller_1.ContactController],
        providers: [
            {
                provide: "ContactSendMessageUseCasePort",
                inject: [],
                useFactory: () => {
                    return new ContactSendMessage_useCase_1.default();
                },
            },
        ],
    })
], ContactModule);
//# sourceMappingURL=Contact.module.js.map
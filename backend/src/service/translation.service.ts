import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class TranslationService {
    constructor(private i18nService: I18nService, @Inject(REQUEST) private request) { }

    async translate(key: string, args?: Record<string, any>): Promise<string> {
        const lang = this.request.i18nLang || 'en'
        if (args) {
            return this.i18nService.translate(`en.${key}`, { args: args, lang: lang })
        }
        else {  
            return this.i18nService.translate(`en.${key}`, { lang: lang })
        }
    }
}
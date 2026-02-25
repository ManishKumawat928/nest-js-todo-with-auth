import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly logger: Logger = new Logger(JwtAuthGuard.name);

    constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const authorization = request.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            throw new HttpException(

                "Unauthorized",
                HttpStatus.UNAUTHORIZED
            );
        }

        const token = authorization.replace("Bearer ", "");
        try {
            const secret = this.configService.get<string>("JWT_SECRET");
            const payload = this.jwtService.verify(token, { secret });

            request["user"] = payload;
            return true;
        } catch (err) {
            this.logger.error(err.message);
            if (err.name === "TokenExpiredError") {
                throw new HttpException(
                    "token expired",
                    HttpStatus.FORBIDDEN
                );
            }
            throw new HttpException(
                "Unauthorized",
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}

export { JwtService };

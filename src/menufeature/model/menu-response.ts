import { MenuItem } from './menu-item';

export class MenuResponse {
    Version: string;
    Data: MenuItem[];
    LSUniqueId: number;
    IsPublicUser: boolean;
    ImageUrl: string;
    LoginUrl: string;
    LoginText: string;
}

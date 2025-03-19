import { FlowRoutes } from "../../shared/enums/flow-routes";
import { Role } from "../../tours/enums/role";

export interface NavItem {
    link: FlowRoutes,
    name: string;
    icon: string;
    role?: Role[],
    children?: NavItem[]
}
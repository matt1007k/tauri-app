import { Directive, DirectiveBinding } from "vue";

export type HasRoleDirective = Directive<HTMLElement, string[]>;

declare module "vue" {
  export interface ComponentCustomProperties {
    vHasRole: HasRoleDirective;
  }
}
const hasRole: HasRoleDirective = (el, binding) => {
  const isHasRole = (roles: string[]) =>
    userRoles.some((role) => roles.includes(role));

  const userRoles = ["product:create", "product:view"];
  const roles = binding.value;
  if (roles && userRoles && isHasRole(roles)) {
    el;
  } else {
    el.style.display = "none";
  }
  console.log("roles", roles);
};
export default hasRole;

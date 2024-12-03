/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding/complete`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/profile`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group/details`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group/home`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group/newpost`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/home`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/reminder`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/reminder/reminders`; params?: Router.UnknownInputParams; } | { pathname: `/types/types`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/onboarding/complete`; params?: Router.UnknownOutputParams; } | { pathname: `/onboarding`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/group/details`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/group/home`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/group`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/group/newpost`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/home`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/reminder`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/reminder/reminders`; params?: Router.UnknownOutputParams; } | { pathname: `/types/types`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/onboarding/complete${`?${string}` | `#${string}` | ''}` | `/onboarding${`?${string}` | `#${string}` | ''}` | `/tabs/profile${`?${string}` | `#${string}` | ''}` | `/tabs/group/details${`?${string}` | `#${string}` | ''}` | `/tabs/group/home${`?${string}` | `#${string}` | ''}` | `/tabs/group${`?${string}` | `#${string}` | ''}` | `/tabs/group/newpost${`?${string}` | `#${string}` | ''}` | `/tabs/home${`?${string}` | `#${string}` | ''}` | `/tabs/reminder${`?${string}` | `#${string}` | ''}` | `/tabs/reminder/reminders${`?${string}` | `#${string}` | ''}` | `/types/types${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding/complete`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/profile`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group/details`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group/home`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/group/newpost`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/home`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/reminder`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/reminder/reminders`; params?: Router.UnknownInputParams; } | { pathname: `/types/types`; params?: Router.UnknownInputParams; };
    }
  }
}

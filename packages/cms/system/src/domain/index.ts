export type { IdGenerator, UserId, ProfileReference } from "./shared-kernel";

export {
    // user
    UserFactory,
    UserService,
    type UserRepository,

    // user identifier
    UserIdentifierFactory,
    UserIdentifierService,
    type UserIdentifierRepository,

    // external identity
    ExternalIdentityFactory,
    type ExternalIdentityRepository,
} from "./identity";

export { ProfileFactory, type ProfileRepository } from "./profile";

export { AccountFactory, AccountService, type AccountRepository } from "./account";

export { SessionFactory, SessionService, type SessionRepository } from "./session";

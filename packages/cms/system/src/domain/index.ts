export type { IdGenerator, UserId, UserReference } from "./shared-kernel";
export {
    // user
    UserFactory,
    UserService,
    type UserRepository,

    // user identifier
    UserIdentifierFactory,
    UserIdentifierService,
    type UserIdentifierRepository,

    // profile
    ProfileFactory,
    type ProfileRepository,

    // external identity
    ExternalIdentityFactory,
    type ExternalIdentityRepository,

    // account
    AccountFactory,
    AccountService,
    type AccountRepository,

    // session
    SessionFactory,
    SessionService,
    type SessionRepository,
} from "./identity";

export interface IProfile {
  profileId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class Profile implements IProfile {
  readonly profileId: string;
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;

  constructor(
    profileId: string,
    userId: string,
    email: string,
    firstName: string,
    lastName: string
  ) {
    this.profileId = profileId;
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}

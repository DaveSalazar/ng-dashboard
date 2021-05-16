export interface IProfile {
  profileId: string;
  firstName: string;
  lastName: string;
}

export class Profile implements IProfile {
  readonly profileId: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(
    profileId: string,
    firstName: string,
    lastName: string
  ) {
    this.profileId = profileId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}

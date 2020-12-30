import { ISerializer } from './Serializer';

export interface IProfile {
  profileId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class Profile implements IProfile, ISerializer<Profile> {
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

  encode(): string {
    return JSON.stringify({
      profileId: this.profileId,
      userId: this.userId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  static decode(obj: string): Profile {
    const data = JSON.parse(obj) as IProfile;
    return new Profile(
      data.profileId,
      data.userId,
      data.email,
      data.firstName,
      data.lastName
    );
  }
}

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is user fetched', () => {
    const users = service.getUsers();
    expect(users.length).toEqual(5)
  })

  it('is user add', () => {
    const users = service.getUsers();
    service.addUsers()
    expect(users.length).toEqual(6)
    expect(users).toContain('New String')
  })

  it('is user deleted', () => {
    const users = service.getUsers();
    service.removeUser()
    expect(users.length).toEqual(4)
    expect(users).not.toContain('vishnu')
  })



});

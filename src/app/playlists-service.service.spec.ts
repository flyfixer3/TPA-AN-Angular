import { TestBed } from '@angular/core/testing';

import { PlaylistsServiceService } from './playlists-service.service';

describe('PlaylistsServiceService', () => {
  let service: PlaylistsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';
import { PlayerService } from './player.service';

describe('Service: Player', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService],
    });
  });

  it('should ...', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));
});

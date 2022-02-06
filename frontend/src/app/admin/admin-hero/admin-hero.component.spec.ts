import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeroComponent } from './admin-hero.component';

describe('AdminHeroComponent', () => {
  let component: AdminHeroComponent;
  let fixture: ComponentFixture<AdminHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModularizadoComponent } from './home-modularizado.component';

describe('HomeModularizadoComponent', () => {
  let component: HomeModularizadoComponent;
  let fixture: ComponentFixture<HomeModularizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeModularizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeModularizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

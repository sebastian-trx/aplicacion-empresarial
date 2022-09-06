import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDejuegosComponent } from './lista-dejuegos.component';

describe('ListaDejuegosComponent', () => {
  let component: ListaDejuegosComponent;
  let fixture: ComponentFixture<ListaDejuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDejuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDejuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendelesListaComponent } from './rendeles-lista.component';

describe('RendelesListaComponent', () => {
  let component: RendelesListaComponent;
  let fixture: ComponentFixture<RendelesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendelesListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendelesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

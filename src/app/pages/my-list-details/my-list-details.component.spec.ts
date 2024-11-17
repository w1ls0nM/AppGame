import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListDetailsComponent } from './my-list-details.component';

describe('MyListDetailsComponent', () => {
  let component: MyListDetailsComponent;
  let fixture: ComponentFixture<MyListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyListDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

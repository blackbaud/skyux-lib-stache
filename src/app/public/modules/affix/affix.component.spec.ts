import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  StacheAffixComponent
} from './affix.component';

import {
  StacheAffixTestComponent
} from './fixtures/affix.component.fixture';

import {
  StacheAffixTopDirective
} from './affix-top.directive';

import {
  StacheAffixModule
} from './affix.module';

describe('StacheAffixComponent', () => {
  let component: StacheAffixComponent;
  let fixture: ComponentFixture<StacheAffixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StacheAffixModule
      ],
      declarations: [
        StacheAffixTestComponent
      ]
    });

    fixture = TestBed.createComponent(StacheAffixComponent);
    component = fixture.componentInstance;
  });

  it('should render the component', () => {
    expect(fixture).toExist();
  });

  it('should format the wrapping DIVs minHeight', () => {
    fixture.detectChanges();
    expect(component.minHeightFormatted).toBeDefined();
  });

  it('should format the wrapping DIVs maxWidth', () => {
    fixture.detectChanges();
    expect(component.maxWidthFormatted).toBeDefined();
  });

  it('should add a min-height property to the wrapping DIV', () => {
    fixture.detectChanges();
    let affixElement = fixture.debugElement.query(By.css('.stache-affix')).nativeElement;
    expect(affixElement.style.minHeight).toBeDefined();
  });

  it('should add a max-width property to the wrapping DIV', () => {
    fixture.detectChanges();
    let affixElement = fixture.debugElement.query(By.css('.stache-affix')).nativeElement;
    expect(affixElement.style.maxWidth).toBeDefined();
  });

  it('should add a position property to the wrapping DIV', () => {
    fixture.detectChanges();
    let affixElement = fixture.debugElement.query(By.css('.stache-affix')).nativeElement;
    expect(affixElement.style.position).toBeDefined();
  });

  it('should determine the position property from the directive status', () => {
    fixture.componentInstance.ngAfterViewInit();
    fixture.componentInstance.affixTopDirective = {
      isAffixed: true
    } as StacheAffixTopDirective;

    fixture.detectChanges();
    let result = fixture.componentInstance.getStyles();
    expect(result.position).toEqual('relative');

    fixture.detectChanges();
    fixture.componentInstance.affixTopDirective.isAffixed = false;
    result = fixture.componentInstance.getStyles();
    expect(result.position).toEqual('static');
  });

  it('should wrap transcluded content with the stacheAffixTop directive', () => {
    fixture.detectChanges();
    let affixElement = fixture.debugElement.query(By.css('.stache-affix')).nativeElement;
    expect(affixElement.children[0].getAttribute('stacheaffixtop')).toBeDefined();
  });

  it('should set the minHeight and maxWidth on window resize', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.minHeightFormatted).toEqual('0px');
    expect(component.maxWidthFormatted).toEqual(`${window.innerWidth}px`);

    spyOnProperty(component.wrapper.nativeElement, 'offsetHeight', 'get').and.returnValue(10);
    spyOnProperty(component.wrapper.nativeElement, 'offsetWidth', 'get').and.returnValue(20);

    SkyAppTestUtility.fireDomEvent(window, 'resize');
    fixture.detectChanges();
    tick();

    expect(component.minHeightFormatted).toEqual('10px');
    expect(component.maxWidthFormatted).toEqual('20px');
  }));
});

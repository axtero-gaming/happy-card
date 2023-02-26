import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as luxon from 'luxon';

import { BaseComponent } from '@shared/base';
import { Constants, Interfaces } from '../../shared';

// 23  24 26 28 2 4 6  8

@Component({
  selector: 'ag-eight-march-page',
  templateUrl: './eight-march-page.component.html',
  styleUrls: [ './eight-march-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EightMarchPageComponent extends BaseComponent implements OnInit {
  public snowflakes;
  public activeDayIndex: number = 0;
  public currentDayIndex: number = 0;
  public currentDay: number = 0;
  public currentDayNotificationIsShown: boolean = true;
  public activeFlower: number = 0;
  public currentDayDescriptors: Interfaces.DayDescriptor;

  constructor (
    // Angular
    protected changeDetection: ChangeDetectorRef,
  ) {
    super(changeDetection);
  }

  ngOnInit (
  ): void {
    const dayDistance = Math.floor(Math.abs(Constants.StartDay.diffNow('days').days));
    const maxDayDistance = Math.floor(Math.abs(Constants.StartDay.diff(Constants.EightMarchDayLx, 'days').days));
    const nextDayNumber = Constants.EightMarchDayLx > luxon.DateTime.utc()
      ? dayDistance : Constants.DayDescriptors.length - 1;

    this.activeDayIndex = nextDayNumber;
    this.currentDayIndex = nextDayNumber;

    this.updateView();
  }

  /**
   * Renders the active day.
   */
  updateView () {
    this.currentDayDescriptors = Constants.DayDescriptors[this.activeDayIndex];

    this.currentDay = this.currentDayDescriptors.day;

    this.activeFlower = this.currentDayDescriptors.flowerStep;
    this.snowflakes = this.currentDayDescriptors.snowView?.snowflakesAreEnabled === true
      ? new Array(this.currentDayDescriptors.snowView?.snowflakesIntensity ?? 50) : [];

    this.currentDayNotificationIsShown = true;
    // const lastSeenDay = this.localStorageService.getValue(Constants.LastSeenDayKey);
    // let lastSeenDayCounter = this.localStorageService.getValue(Constants.LastSeenDayCounterKey) ?? 0;
    // if (nextDayNumber !== lastSeenDay) {
    //   this.currentDayNotificationIsShown = true;
    //   lastSeenDayCounter = 1;
    // } else if (lastSeenDayCounter < 3) {
    //   this.currentDayNotificationIsShown = true;
    //   lastSeenDayCounter += 1;
    // } else {
    //   this.currentDayNotificationIsShown = false;
    // }

    // this.localStorageService.setValue(Constants.LastSeenDayKey, nextDayNumber);
    // this.localStorageService.setValue(Constants.LastSeenDayCounterKey, lastSeenDayCounter);

    console.log(`-----`, this.activeFlower);
    this.forceRender();
  }

  /**
   * Moves the active day to prev day.
   *
   * @return {void}
   */
  moveToPrevDay () {
    if (this.activeDayIndex <= 0) {
      return;
    }

    this.activeDayIndex -= 1;
    this.updateView();
  }

  /**
   * Moves the active day to next day.
   *
   * @return {void}
   */
  moveToNextDay () {
    if (this.activeDayIndex >= this.currentDayIndex) {
      return;
    }

    this.activeDayIndex += 1;
    this.updateView();
  }

  /**
   * Hides the timer and shows the Open button.
   *
   * @return {void}
   */
  onTimerEnded (): void {
    // this.openCardIsVisible = true;
    this.forceRender();
  }
}

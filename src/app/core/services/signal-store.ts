import { computed, Signal, signal } from '@angular/core';

export class SignalStoreService<T> {
  readonly state = signal({} as T);

  selectState<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.state()[key]);
  }

  setState<K extends keyof T>(key: K, data: T[K]): void {
    this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  patchState(newState: Partial<T>): void {
    this.state.update((currentValue) => ({ ...currentValue, ...newState }));
  }
}

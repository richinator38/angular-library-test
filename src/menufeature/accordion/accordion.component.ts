﻿import { Component, Input } from '@angular/core';
import { AccordionPanelComponent } from './accordion-group.component';

/** Displays collapsible content panels for presenting information in a limited amount of space. */
@Component({
    moduleId: module.id.toString(),
    selector: 'menu-accordion',
    template: `<ng-content></ng-content>`,
    // tslint:disable-next-line
    host: {
        '[class.panel-group]': 'true',
        '[attr.aria-multiselectable]': 'closeOthers',
        role: 'tablist'
    }
})
export class AccordionComponent {
    /** if `true` expanding one item will close all others */
    @Input() public closeOthers: boolean;

    protected groups: AccordionPanelComponent[] = [];
    protected _closeAll: boolean;

    // public constructor(config: AccordionConfig) {
    //   Object.assign(this, config);
    // }

    public closeOtherPanels(openGroup: AccordionPanelComponent): void {
        if (!this.closeOthers) {
            return;
        }

        this.groups.forEach((group: AccordionPanelComponent) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    public addGroup(group: AccordionPanelComponent): void {
        this.groups.push(group);
    }

    public removeGroup(group: AccordionPanelComponent): void {
        let index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }

    @Input()
    public get closeAll(): boolean {
        return this._closeAll;
    }

    public set closeAll(value: boolean) {
        this._closeAll = value;
        if (value) {
            this.closeAllHeader();
        }
    }

    public closeAllHeader(): void {
        this.groups.forEach((group: AccordionPanelComponent) => {
            group.isOpen = false;
        });
    }


}

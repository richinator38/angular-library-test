import { Component, OnInit, ElementRef } from '@angular/core';
import { MenuService } from '../sharedservice/menu.service';
import { MenuResponse } from '../model/menu-response';
import { MenuItem } from '../model/menu-item';
import { MenuSourceItem } from '../model/menu-source-item';

@Component({
    moduleId: module.id.toString(),
    selector: 'menu-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {
    isMousedown: any;
    isletter: any;
    isFirstOpen = false;
    closeAll = false;
    closeAllSubmenuItems = false;
    menuItems: MenuSourceItem[] = [];

    constructor(private menuService: MenuService, private elRef: ElementRef) {
    }

    onMouseenter() {
        this.isMousedown = true;
        this.isFirstOpen = false;
        this.closeAll = false;
        this.closeAllSubmenuItems = false;
    }

    onMouseup() {
        this.isMousedown = true;
        this.isFirstOpen = false;
    }

    onMouseleave() {
        this.isMousedown = false;
        this.isFirstOpen = false;
        this.closeAll = true;
        this.closeAllSubmenuItems = true;
    }

    ngOnInit() {
        this.getMenuItems();
    }

    getMenuItems(): void {
      this.menuService.getMenuItems()
        .subscribe(menuItems => {
          let response: MenuResponse = <MenuResponse>menuItems;

          let menuMap: Map<number, MenuSourceItem> = new Map<number, MenuSourceItem>();

          response.Data.forEach(item => {

            if (item.MenuItemId === item.ParentMenuItemId) {
              if (!menuMap.get(item.ParentMenuItemId)) {
                this.menuItems.push(this.getMenuSourceItem(item));
              }
            } else {
              let itemFound = false;
              for (let i = 0; i < this.menuItems.length; i++) {

                if (this.menuItems[i].MenuItemId === item.ParentMenuItemId) {
                  itemFound = true;

                  this.menuItems[i].Children.push(this.getMenuSourceItem(item));
                  break;
                }
                if (!itemFound) {
                  let children: any[] = this.menuItems[i].Children;
                  for (let j = 0; j < children.length; j++) {
                    if (children[j].MenuItemId === item.ParentMenuItemId) {
                      let subChild: MenuSourceItem = <MenuSourceItem>children[j];
                      subChild.Children.push(this.getMenuSourceItem(item));
                      itemFound = true;
                      break;
                    }
                  }
                }

                if (itemFound) {
                  break;
                }
              }
            }
          });
        });
    }

    getMenuSourceItem(item: MenuItem): MenuSourceItem {
        let menuSourceItem: MenuSourceItem = new MenuSourceItem();
        // for (let prop in item) {
            // menuSourceItem[prop] = item[prop];
        // }

        return menuSourceItem;
    }

    onMenuItemClick(event: any, item: MenuSourceItem): void {
        event.stopImmediatePropagation();
        this.closeAllSubmenuItems = true;
        if (item.Link != null && item.Target == null || item.Link != null && item.Target === '_blank') {
            window.location.href = item.Link;
        }
    }
}

import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs-container">
      <div class="tabs-header">
        @for (tab of tabs(); track tab.id) {
          <button 
            class="tab-button"
            [class.active]="activeTab() === tab.id"
            [class.disabled]="tab.disabled"
            [disabled]="tab.disabled"
            (click)="selectTab(tab.id)">
            {{ tab.label }}
          </button>
        }
      </div>
      
      <div class="tabs-content">
        @for (tab of tabs(); track tab.id) {
          @if (activeTab() === tab.id) {
            <div class="tab-panel" [attr.data-tab]="tab.id">
              <ng-content [select]="'[slot=' + tab.id + ']'"></ng-content>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .tabs-container {
      width: 100%;
    }
    
    .tabs-header {
      display: flex;
      border-bottom: 2px solid #e9ecef;
      background: #f8f9fa;
      border-radius: 8px 8px 0 0;
    }
    
    .tab-button {
      padding: 1rem 1.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: #6c757d;
      transition: all 0.2s;
      border-bottom: 3px solid transparent;
    }
    
    .tab-button:hover:not(.disabled) {
      background: #e9ecef;
      color: #495057;
    }
    
    .tab-button.active {
      color: #58cc02;
      border-bottom-color: #58cc02;
      background: white;
    }
    
    .tab-button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .tabs-content {
      padding: 1.5rem;
      background: white;
      border: 1px solid #e9ecef;
      border-top: none;
      border-radius: 0 0 8px 8px;
      min-height: 200px;
    }
    
    .tab-panel {
      animation: fadeIn 0.2s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class TabsComponent {
  readonly tabs = input.required<TabItem[]>();
  readonly defaultTab = input<string>('');
  
  readonly activeTab = signal('');
  
  ngOnInit() {
    const defaultId = this.defaultTab() || this.tabs()[0]?.id;
    if (defaultId) {
      this.activeTab.set(defaultId);
    }
  }
  
  selectTab(tabId: string): void {
    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTab.set(tabId);
    }
  }
}
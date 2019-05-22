import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hungry-restaurants',
  template: `
    <h1>Restaurants</h1>
    <div class="container" nz-row nzType="flex" nzJustify="start">
      <div nz-col nzSpan="4" class="p-10">
        <nz-card nzHoverable [nzCover]="coverTemplate">
          <nz-card-meta nzTitle="Coriander"></nz-card-meta>
        </nz-card>
        <ng-template #coverTemplate>
          <img
            class="image"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .p-10 {
        padding: 10px;
      }

      .image {
        height: 300px;
        object-fit: cover;
        object-position: center;
      }
    `
  ]
})
export class RestaurantsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

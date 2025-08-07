// layoutModel.ts
import { type IJsonModel } from 'flexlayout-react';

export const jsonModel: IJsonModel = {
  global: {
    splitterEnableHandle: true,
    tabSetMinWidth: 32,      // can shrink to 32 px – narrow enough for the vertical strip
    tabSetMinHeight: 100,
  },
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'tabset',
        id:   'descriptionSet',          //  ← keep a handle
        weight: 40,
        enableMaximize: true,            //  ← lets FlexLayout do "full-screen"
        children: [
          { id:'description', name:'Description', component:'description', type:'tab' },
        ],
      },
      {
        type: 'column',
        weight: 60,
        children: [
          {
            type: 'tabset',
            id:   'codeSet',              //  ← handle for the other side
            weight: 70,
            enableMaximize: true,
            children: [
              { id:'codeEditor', name:'Code', component:'code', type:'tab' },
            ],
          },
          {
            type: 'tabset',
            id:   'testsSet',
            weight: 30,
            children: [
              { id:'testResult', name:'Test Result', component:'tests', type:'tab' },
            ],
          },
        ],
      },
    ],
  },
};

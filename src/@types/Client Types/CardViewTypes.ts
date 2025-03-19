export interface CardViewAllData {
  extra_field_first: ExtraFieldFirst[];
  extra_field_second: ExtraFieldSecond[];
  object_data: CardViewData[];
  object_info: CardViewInfo[];
  object_type: number;
}
export interface ExtraFieldFirst {
  x_id?: number;
  y_id?: number;
  keyfield: boolean;
  idbrowsercolumn: string;
  browsercolumnname: string;
  browsercolumnorder: number;
  browsercolumnwidth: number;
  browsercolumnformat: any;
  browsercolumncaption: string;
  browsercolumnvisible: boolean;
  browsercolumntypename: string;
  browsercolumntypealign: string;
  idbrowsercolumn_parent: any;
  browsercolumntypeformat?: string;
}

export interface ExtraFieldSecond {
  [key: string]: string | number | null | undefined;
  idbasicdocument: number;
  datebasicdocument: string;
  numberbasicdocument: any;
  namebasicdocument: string;
  labelbasicdocument: any;
  idtypebasicdocument: any;
  idviewbasicdocument: any;
  typename: any;
  viewname: any;
  idorganization: number;
  fullnamerus: any;
  abbreviatednamerus: any;
  organizationname: any;
  searchname: any;
  idstatusdocument: any;
  idaccessdocument: any;
  namestatusdocument: any;
  nameaccessdocument: any;
  idbasicdocumentuuid: any;
  is_tpr: any;
  idemployee: any;
  createdate: string;
  createuser: string;
  changeuser: string;
  changedate: string;
}

//Карточка
export interface CardViewInfo {
  browsername: string;
  browsercaption: string;
  browserheight: number;
  browserwidth: number;
  idbrowserheader: string;
  idmenu: string;
  menuwidth: number;
  modifydate: string;
  idis: string;
  viewerlayout: number;
  toolbarvisible: boolean;
  data: any;
  standartitemstoolbargroupingmode: number;
  finder_name: any;
  idbrowser: any;
  finder_param: any;
}

export interface CardViewData {
  menuname: string;
  real_name: string;
  visible: boolean;
  idmenu: string;
  menu_item_data: CardViewMenuItemData[];
}

export interface CardViewMenuItemData {
  idmenu: string;
  caption: string;
  visible: boolean;
  frametype: number;
  id_object: string;
  sortorder: number;
  p_param: {};
  idmenuitem: string;
  idmenuitemparent?: string;
}

import { TPaginationSort } from '@/utils/encodingUtils';

export interface BrowserAllData {
  object_info: Array<BrowserConfig>;
  object_data: Array<BrowserDataContent>;
  object_type: number;
  extra_field_first: any[];
  extra_field_second: any[];
  pagination: TPaginationSort;
}

export interface BrowserConfig {
  browsercaption: string;
  browserdefaultview: number;
  browserheight: number;
  browserwidth: number;
  browsername: string;
  col_json: BrowserColumn[];
  data: unknown | null;
  filterrow: boolean;
  finder_name: string | null;
  finder_param: unknown | null;
  id_viewer: string | null;
  idbpondoubleclick: string;
  idbrowser: string;
  idbrowserheader: string | null;
  idis: string | null;
  idmenu: string;
  menuwidth: number | null;
  modifydate: string | null;
  standartitemstoolbargroupingmode: unknown | null;
  toolbarvisible: boolean | null;
  viewerlayout: unknown | null;
}

export interface BrowserColumn {
  idbrowsercolumn: string;
  browsercolumnname: string;
  browsercolumncaption: string;
  browsercolumnwidth: number;
  browsercolumnvisible: boolean;
  browsercolumnorder: number;
  browsercolumnformat: string | null;
  browsercolumntypename: string;
  browsercolumntypealign: string;
  browsercolumntypeformat: string | null;
  keyfield: boolean;
}

export interface BrowserDataContent {
  [key: string]: unknown;
  additionally_works: string;
  branch_subdivision: string;
  changedate: string;
  changeuser: string;
  completed_works: string;
  createdate: string;
  createuser: string;
  date_accept_object: string;
  date_repair_end: string;
  date_repair_start: string;
  datebasicdocument: string;
  disp_name: string;
  estimate_cost: number;
  fact_cost: number;
  fil_name: string;
  id_act_acceptance_object_repair: string;
  id_assessment_fire_safety_level_facility: number;
  id_employee: number;
  id_mro_complex_facility: number;
  id_view_repair: number;
  id_аssessment_quality_repair_work_performed: number;
  id_аssessment_quality_repaired_equipment: number;
  idbasicdocument: number;
  idmenu: null;
  idorganization: number;
  menu_item_data: null;
  menuname: null;
  name_assessment_fire_safety_level_facility: string;
  name_view_repair: string;
  name_аssessment_quality_repair_work_performed: string;
  name_аssessment_quality_repaired_equipment: string;
  namebasicdocument: string;
  not_completed_works: string;
  position: string;
  real_name: null | string;
  res_name: string;
  short_name: string;
  visible: null;
  warranty_period: number;
  idbpondoubleclick: string | undefined;
}

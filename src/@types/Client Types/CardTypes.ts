import { TPaginationSort } from '@/utils/encodingUtils';

export interface CardAllData {
  object_info: Array<CardInfo>;
  object_data: Array<CardData>;
  object_type: number;
  extra_field_first: any[];
  extra_field_second: any[];
  pagination: TPaginationSort;
}

//Карточка
export interface CardInfo {
  x_id: number;
  y_id: number;
  keyfield: boolean;
  idbrowsercolumn: string;
  idbrowsercolumn_parent: string | null;
  browsercolumnname: string;
  browsercolumnorder: number;
  browsercolumnwidth: number;
  browsercolumnformat: string | null;
  browsercolumncaption: string;
  browsercolumnvisible: boolean;
  browsercolumntypename: string;
  browsercolumntypealign: string;
  browsercolumntypeformat: string | null;
}

export interface CardData {
  id_mro_complex_facility: string | null;
  id_object_uuid: string;
  id_category_accounting_objects: string | null;
  code_category: string | null;
  category: string | null;
  disp_name: string;
  namespowergridfacility: string;
  id_equipment_voltage: number;
  name_equipment_voltage: string;
  inventory_number: string;
  object_address: string | null;
  date_overhead_power_line: string;
  idorganization: number;
  idorganization_area: number;
  branch_subdivision: string;
  org_br: string | null;
  idemployee: string | null;
  employee: string | null;
  notes: string | null;
  nametypepowergridfacility_eis: string | null;
  disp_name_connection: string;
  idtypepowergridfacility_eis: number;
  searchname: string;
  id_mro_obj: string | null;
  id_division: string | null;
  idrecstatus: number;
  type_n: string | null;
  is_ps_n: string | null;
  real_category: string | null;
  id_equipment_voltage_real: number;
}

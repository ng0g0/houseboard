export const viewInfo = 'viewInfo'; 



export const icons = [
	{
		name: 'BLOCK' , 
		icon: 'glyphicon glyphicon-open-file',
		label: 'AddBlock',
		action: 'add',
		target: '#newBlock'
	},
	{
		name: 'ENTRANCE' , 
		icon: 'glyphicon glyphicon-home',
		label: 'AddEntrance',
		action: 'add',
		target: '#newEntrance'
		},
	{
		name: 'FLOOR' , 
		icon: 'glyphicon glyphicon-saved',
		label: 'AddFloor',
		action: 'add',
		target: '#newFloor'
	},
	{
		name: 'APARTMENT' , 
		icon: 'glyphicon glyphicon-bed',
		label: 'AddApartment',
		action: 'add',
		target: '#newApartment'
	},
	{
		name: 'PERSON' , 
		icon: 'glyphicon glyphicon-use',
		label: 'AddPerson',
		action: 'add'
	},
	{
		name: 'ACOM-BL' , 
		icon: 'glyphicon glyphicon-map-marker',
		label: 'AddBlockAcom',
		action: 'add',
		target: '#newAcomudation'
	},
	{
		name: 'ACOM-ENT' , 
		icon: 'glyphicon glyphicon-bell',
		label: 'AddEntAcom',
		action: 'add',
		target: '#newAcomudation'
	},
	{
		name: 'ACOM-FL' , 
		icon: 'glyphicon glyphicon-tag',
		label: 'AddFloorAcom',
		action: 'add',
		target: '#newAcomudation'
	},
	{
		name: 'ACOM-AP' , 
		icon: 'glyphicon glyphicon-tin',
		label: 'AddApartAcom',
		action: 'add',
		target: '#newAcomudation'
	},
	{
		name: 'INFO' , 
		icon: 'glyphicon glyphicon-info-sign',
		label: 'ViewInfo',
		action: 'viewInfo',
		target: 'blocks'
	},
	{
		name: 'INFOBLOCK' , 
		icon: 'glyphicon glyphicon-info-sign',
		label: 'ViewInfo',
		action: 'viewInfo',
		target: '#newBlock'
	}
	,
	{
		name: 'FLOORINFO' , 
		icon: 'glyphicon glyphicon-info-sign',
		label: 'ViewInfo',
		action: 'viewInfo',
		target: '#newFloor'
	},
	{
		name: 'APINFO' , 
		icon: 'glyphicon glyphicon-info-sign',
		label: 'ViewInfo',
		action: 'viewInfo',
		target: '#newApartment'
	}
	
	,
	{
		name: 'DELETE' , 
		icon: 'glyphicon glyphicon-trash',
		label: 'Delete',
		action: 'delete',
		target: '#delete'
	}
];
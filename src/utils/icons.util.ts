import { ServiceIcon1 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon1"; // WIFI
import { ServiceIcon2 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon2"; // PARKING
import { ServiceIcon3 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon3"; // RESTAURANTE
import { ServiceIcon4 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon4"; // BAR
import { ServiceIcon5 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon5"; // CAFETERÍA
import { ServiceIcon6 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon6"; // TODO INCLUIDO
import { ServiceIcon7 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon7"; // TOALLA
import { ServiceIcon8 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon8"; // BAÑO
import { ServiceIcon9 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon9"; // DUCHAS
import { ServiceIcon10 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon10"; // ACCESIBLE
import { ServiceIcon11 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon11"; // GUARDA MALETAS
import { ServiceIcon12 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon12"; // TAQUILLA
import { ServiceIcon13 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon13"; // PISCINA INTERIOR
import { ServiceIcon14 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon14"; // PISCINA EXTERIOR
import { ServiceIcon15 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon15"; // JACUZZI
import { ServiceIcon16 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon16"; // GIMNASIO
import { ServiceIcon17 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon17"; // LAVANDERÍA
import { ServiceIcon18 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon18"; // CENTRO DE NEGOCION
import { ServiceIcon19 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon19"; // MASCOTAS ADMITIDAS
import { ServiceIcon20 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon20"; // CLUB INFANTIL
import { ServiceIcon21 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon21"; // SPA
import { ServiceIcon22 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon22"; // MASAJE
import { ServiceIcon23 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon23"; // ACCESO PLAYA
import { ServiceIcon24 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon24"; // MÚSICA EN DIRECTO
import { ServiceIcon25 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon25"; // DJ
import { ServiceIcon26 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon26"; // SHOPPING
import { ServiceIcon27 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon27"; // ACTUVIDADES ACUÁTICAS
import { ServiceIcon28 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon28"; //24 // TENIS
import { ServiceIcon29 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon29"; //OK // PÁDEL
import { ServiceIcon30 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon30"; //OK // GOLF
import { ServiceIcon31 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon31"; //OK // PARQUE ACUÁTICO
import { ServiceIcon32 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon32"; //OK // ROOFTOP
import { ServiceIcon33 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon33"; //OK // LANZADERA AEROPUERTO
import { ServiceIcon34 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon34"; //OK // EMBARCADERO
import { ServiceIcon35 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon35"; //OK // HELIPUERTO
import { ServiceIcon36 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon36";
import { ServiceIcon37 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon37";
import { ServiceIcon38 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon38";
import { ServiceIcon39 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon39";
import { ServiceIcon40 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon40";
import { ServiceIcon41 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon41";
import { ServiceIcon42 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon42";
import { ServiceIcon43 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon43";
import { ServiceIcon44 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon44";
import { ServiceIcon45 } from "@app/components/atoms/servicesIconsSvg/ServiceIcon45";
// import ShowerSvgIcon from '@app/components/atoms/servicesIconsSvg/ShowerSvgIcon';

type IconIndexType = {
	[key: string]: any;
};

export const generateServiceIconUrl = (id: string) => {
	const uri = `https://www.daypass.com/images/serviceIcons/icons-daypass-${String(id).padStart(
		2,
		"0",
	)}.svg`;

	return uri;
};

export const servicesIconsIndex: IconIndexType = {
	"1": ServiceIcon1,
	"2": ServiceIcon2,
	"3": ServiceIcon3,
	"4": ServiceIcon4,
	"5": ServiceIcon5,
	"6": ServiceIcon6,
	"7": ServiceIcon7,
	"8": ServiceIcon8,
	"9": ServiceIcon9,
	"10": ServiceIcon10,
	"11": ServiceIcon11,
	"12": ServiceIcon12,
	"13": ServiceIcon13,
	"14": ServiceIcon14,
	"15": ServiceIcon15,
	"16": ServiceIcon16,
	"17": ServiceIcon17,
	"18": ServiceIcon18,
	"19": ServiceIcon19,
	"20": ServiceIcon20,
	"21": ServiceIcon21,
	"22": ServiceIcon22,
	"23": ServiceIcon23,
	"24": ServiceIcon24,
	"25": ServiceIcon25,
	"26": ServiceIcon26,
	"27": ServiceIcon27,
	"28": ServiceIcon28,
	"29": ServiceIcon29,
	"30": ServiceIcon30,
	"31": ServiceIcon31,
	"32": ServiceIcon32,
	"33": ServiceIcon33,
	"34": ServiceIcon34,
	"35": ServiceIcon35, // new icons were changed up to here
	"36": ServiceIcon36,
	"37": ServiceIcon37,
	"38": ServiceIcon38,
	"39": ServiceIcon39,
	"40": ServiceIcon40,
	"41": ServiceIcon41,
	"42": ServiceIcon42,
	"43": ServiceIcon43,
	"44": ServiceIcon44,
	"45": ServiceIcon45,
	// '46': ShowerSvgIcon, // nuevo icono agregado en la última posición
};

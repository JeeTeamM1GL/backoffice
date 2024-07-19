// import React, { useEffect, useState } from 'react';
// import { Button, Input, Select, Pagination, Card } from 'antd';
// import { Memoire as ItemMemoire } from '../../front/composants/Items.tsx';
// import memoiresFeatures from '../../Features/Feautres.tsx';
// import { IMemoire } from '../../interfaces/interfaces.ts';

// const { Option } = Select;



// const ITEMS_PER_PAGE = 18; // Nombre d'items par page

// export default function Memoire() {
//     const [memoires, setMemoires] = useState<IMemoire[] | []>([])

//     useEffect(() => {
//       const recupererTousMemoires = () => {
//         //fonction pour recuperer les data du back

//         //simulation
//         setMemoires(memoiresFeatures)
//       }
//       recupererTousMemoires(); // Appeler la fonction ici
//     }, []);
//   const [filtre, setFiltre] = useState({
//     typeDeFiltre: "tout-voir",
//     filtrerPar: "jury",
//     objetDuFiltre: "",
//     placeholder: "entrez le nom du jury à filtrer..."
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const handleFilterChange = (value: string) => {
//     if (value === "tout-voir") {
//       setFiltre({ ...filtre, typeDeFiltre: "tout-voir" });
//     } else if (value === "filtrer") {
//       setFiltre({ ...filtre, typeDeFiltre: "filtrer" });
//     }
//   };

//   const handleFilterByChange = (value: string) => {
//     if (value === "jury") {
//       setFiltre({ ...filtre, filtrerPar: "jury", placeholder: "entrez le nom du jury à filtrer..." });
//     } else if (value === "annee-scolaire") {
//       setFiltre({ ...filtre, filtrerPar: "annee-scolaire", placeholder: "entrez l'année scolaire à filtrer..." });
//     } else if (value === "filiere") {
//       setFiltre({ ...filtre, filtrerPar: "filiere", placeholder: "entrez la filière à filtrer..." });
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentMemoires = memoires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   return (
//     <Card>
//       <div style={{ padding: '20px' }}>
//         <div style={{ backgroundColor: '#BEC9CB', padding: '20px', display: 'flex', alignItems: 'center' }}>
//           <Select
//             value={filtre.typeDeFiltre}
//             onChange={handleFilterChange}
//             style={{ width: '150px', marginLeft: '10px' }}
//           >
//             <Option value="tout-voir">Tout voir</Option>
//             <Option value="filtrer">Filtrer</Option>
//           </Select>
//           {filtre.typeDeFiltre === "filtrer" && (
//             <>
//               <p style={{ marginTop: "5px", marginLeft: '10px' }}>Par:</p>
//               <Select
//                 placeholder="par jury"
//                 value={filtre.filtrerPar}
//                 onChange={handleFilterByChange}
//                 style={{ width: '150px', marginLeft: '10px' }}
//               >
//                 <Option value="jury">Jury</Option>
//                 <Option value="annee-scolaire">Année scolaire</Option>
//                 <Option value="filiere">Filière</Option>
//               </Select>
//               <Input
//                 placeholder={filtre.placeholder}
//                 value={filtre.objetDuFiltre}
//                 onChange={(e) => setFiltre({ ...filtre, objetDuFiltre: e.target.value })}
//                 style={{ width: '300px', marginLeft: '10px' }}
//               />
//             </>
//           )}
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", maxHeight: "70%", overflow: "auto" }}>
//             {currentMemoires.map((memoire, index) => (
//               <ItemMemoire key={index} body={memoire} />
//             ))}
//           </div>
//           <Pagination
//             current={currentPage}
//             pageSize={ITEMS_PER_PAGE}
//             total={memoires.length}
//             onChange={handlePageChange}
//             style={{ marginTop: '20px' }}
//           />
//         </div>
//       </div>
//     </Card>
//   );
// }






import React, { useEffect, useState } from 'react'
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Drawer, Flex, Input, List, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import AddCategory from '../../components/AddCategory.tsx';
import { IMemoire } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';
import { Memoire } from '../../front/composants/Items.tsx';



const data: IMemoire[] = [
  {
    image:"",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2024",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
  {
    image:"https://www.univ-blida.dz/wp-content/uploads/2022/10/soutenance-these.jpg",
    titre: "vide",
    description: "vide",
    dateSoutenance: new Date(),
    document: "vide",
    year: "2023",
    categorie: { nom: "vide", description: "vide" },
    filiere: { intitule: "GL" },
    classe: { nom: "M1" },
  },
];


function Memoires() {
  // const [categories , setMemoires] = useState([]);
  // const [loading , setLoading] = useState(false);
  // useEffect(() => {
  //     setLoading(true)
  //     getActions(endpoints.categories.LIST)
  //     .then((response : any)=>{
  //         console.log(response)
  //         //setMemoires(response?.data)
  //     })
  //     .finally(()=>{
  //         setLoading(false)
  //     })

  //   return () => {

  //   }
  // }, [])

  const [operation, setOperation] = useState<string>("")
  const [currentRecord, setCurrentRecord] = useState<IMemoire | any>(null)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const addModal = () => {
    setIsModalOpen(true);
    setOperation("add")
    setCurrentRecord(null)
  };

  const updateModal = (record: IMemoire) => {
    setIsModalOpen(true);
    setOperation("update")
    setCurrentRecord(record)

  };
  const onDelete = (id: any) => {
    deleteActions(endpoints.categories.DELETE + "" + id)
      .then((res) => {
        if (res?.data?.status === 200) {
          message.success('Memoire suprimer avec succes')
        }
      }
      )

  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const columns: TableProps<IMemoire | any>['columns'] = [
  //   {
  //     title: 'Nom',
  //     dataIndex: 'nom',
  //     key: 'nom',
  //     render: (record) => <a>{record}</a>,
  //   },
  //   {
  //     title: 'Description',
  //     dataIndex: 'description',
  //     key: 'description',
  //   },
  //   {
  //     title: 'Date de creation',
  //     dataIndex: 'createdAt',
  //     key: 'createdAt',
  //     render: (record) => <a>{formatDate(record.toISOString())}</a>,
  //   },

  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <Button type="text" onClick={() => { updateModal(record as any) }} icon={<EditOutlined />} />



  //         <Popconfirm
  //           title="Delete the task"
  //           description="Are you sure to delete this task?"
  //           onConfirm={() => onDelete(record?.id)}
  //           // onCancel={}
  //           okText="Yes"
  //           cancelText="No"
  //         >
  //           <Button type="text" danger icon={<DeleteOutlined />} />
  //         </Popconfirm>
  //       </Space>
  //     ),
  //   },
  // ];


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <Title level={4}>Memoires</Title>
      <Flex justify="space-between" flex={1} align="center">
        <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} />
        <Space>
          <Button type="primary"  onClick={showDrawer}>Filtrer</Button>
          <Button type="primary" onClick={addModal}>Nouveau</Button>
        </Space>

      </Flex>
      <br />
      {/* <Table columns={columns} dataSource={data} /> */}
      <List
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 12,
        }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item: IMemoire) => (
          <List.Item>
            {/* <Card title={item.title}>Card content</Card> */}
            <Memoire body={item} />
          </List.Item>
        )}
      />
      <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvelle categorie" : "Modifier categorie"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <AddCategory operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} />
      </Modal>
      <Drawer title="Filtrer les memoires" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Card>

  )
}

export default Memoires;

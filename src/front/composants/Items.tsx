import { Button, Input, Select, Table, Modal } from 'antd';
import React, { useState } from 'react';
import Alignement from './Alignement.tsx';
import logo from '../../asset/logo.png'
const { Option } = Select;

interface ButtonsProps {
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  values?: string[];
  style?: React.CSSProperties;
  onClick: (e: React.MouseEvent<HTMLElement>, value: string) => void;
  alignement?: 'X' | 'Y';
}

export function Buttons({
  type,
  values = ["bouton1", "bouton2"],
  style = { marginBottom: '20px' },
  onClick,
  alignement = "Y"
}: ButtonsProps) {
  return (
    <Alignement alignement={alignement}>
      {values?.map((value, i) => (
        <div key={i} style={{ display: alignement === "Y" ? 'block' : 'inline-block' }}>
          <Button type={type ?? "primary"} onClick={(e) => onClick(e, value)} style={style}>{value}</Button>
        </div>
      ))}
    </Alignement>
  );
}

interface SelectsProps {
  SelectValues: string;
  style?: React.CSSProperties;
  onChange: (value: string) => void;
  optionValue: string;
}

export function Selects({ SelectValues, style, onChange, optionValue }: SelectsProps) {
  return (
    <div>
      <Select
        placeholder="Select an option"
        value={SelectValues}
        onChange={onChange}
        style={style}
      >
        <Option value={optionValue}>{optionValue}</Option>
      </Select>
    </div>
  );
}

interface TablesProps {
  style?: React.CSSProperties;
  dataSource: any[];
  columns: any[];
}

export function Tables({ style, dataSource, columns }: TablesProps) {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} style={style} />
    </div>
  );
}

interface ImputItem {
  key: number;
  value: string;
  style?: React.CSSProperties;
  onChange: (index: number, value: string) => void;
}

interface ImputsProps {
  items: ImputItem[];
  alignement?: 'X' | 'Y';
}

export function Imputs({ items, alignement = "Y" }: ImputsProps) {
  return (
    <Alignement alignement={alignement}>
      {items?.map((item) => (
        <div key={item.key} style={{ display: alignement === "Y" ? 'block' : 'inline-block' }}>
          <Input
            placeholder="Input something"
            value={item.value}
            onChange={(e) => item.onChange(item.key, e.target.value)}
            style={item.style}
          />
        </div>
      ))}
    </Alignement>
  );
}


export function Memoire(memoire: { id: string | number, nom: string, anneeScolaire: string, classe: string, filiere: string, image: string }) {
  const [modal, contextHolder] = Modal.useModal();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setVisible(true)} key={memoire.id ?? new Date().getTime()} style={{ borderRadius:"10px", backgroundColor: '#ff9600', maxHeight: '300px', textAlign: 'center', minWidth: "150px", maxWidth: "160px", margin: "10px", marginBottom: "20px" }}>
        {memoire.image ? <img src={memoire.image} alt="image" width={"70px"} height={"70px"} /> :
          <center>
            <div style={{ backgroundColor: '#0077ff', height: '130px', textAlign: 'center', minWidth: "120px", maxWidth: "70px", margin: "10px" }}>
              <img src={logo} alt="image" width={"70px"} height={"70px"} />
            </div>
          </center>}

        <div style={{ fontSize: "15px", margin: "10px" }}>
          <p>{memoire.nom === "" ? "non-mentionné" : memoire.nom}</p>
          <p>{memoire.anneeScolaire === "" ? "non-mentionné" : memoire.anneeScolaire}</p>
          <p>{`${memoire.classe === "" ? "non-mentionné" : memoire.classe} - ${memoire.filiere === "" ? "non-mentionné" : memoire.filiere}`}</p>
        </div>

      </div>
      <div>
        <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
          <h2>{memoire.nom}</h2>
          <p>Année Scolaire: {memoire.anneeScolaire}</p>
          <p>Classe: {memoire.classe}</p>
          <p>Filière: {memoire.filiere}</p>
          {/* Ajoutez plus de détails ici si nécessaire */}
        </Modal>
      </div>
    </>

  );
}
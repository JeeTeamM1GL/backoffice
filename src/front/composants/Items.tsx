import { Button, Input, Select, Table, Modal, Card, List } from 'antd';
import React, { useState } from 'react';
import Alignement from './Alignement.tsx';
//import require('../../asset/logo.png') from '../../asset/require('../../asset/logo.png').png'
import { useNavigate } from 'react-router-dom';
import { IMemoire } from '../../interfaces/interfaces.ts';
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


export function Memoire({ body }: { body: IMemoire }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [theBody, setTheBody] = useState<IMemoire>(body);
  const n = useNavigate();

  return (

    <>
      <div /*onClick={() => setVisible(true)} key={theBody.id ?? new Date().getTime()} */
        style={{ padding: "10px", borderRadius: "10px", backgroundColor: "#eb4d4b", maxHeight: '300px', height: "200px", textAlign: 'center', minWidth: "150px", width: "75%", margin: "10px", marginBottom: "20px", boxShadow: '5px 4px 2px -2px gray' }}>
        {theBody.image && theBody.image !== "" ? (
          <center>
            <img src={theBody.image ?? require('../../asset/logo.png')} alt="image" width={"100px"} height={"120px"} />
          </center>

        ) : (
          <center>
            <div style={{ backgroundColor: '#0077ff', minWidth: "120px", maxWidth: "70px", margin: "10px" }}>
              <img src={require('../../asset/logo.png')} alt="image" width={"100px"} height={"100px"} />
            </div>
          </center>
        )}

        <div style={{ fontSize: "15px", margin: "10px" }}>
          <p>
            <small style={{ marginTop: 0, display: 'block' }}>
              {`${theBody.filiere?.intitule}-${theBody.classe?.nom}` ?? "non-mentionné"}
            </small>
            {theBody.titre ?? "non-mentionné"}<br/>
          </p>

        </div>
      </div>
      <div>
        <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
          <h2 style={{ color: "#0077ff" }}>{theBody.titre ?? "Titre non mentionné"}</h2>
          <div>
            <p><b>Resumé:</b></p>
            <p style={{ marginTop: "0px" }}>{theBody.description ?? "non mentionné"}</p>
          </div>

          <small>Classe: {theBody.classe?.nom ?? "non mentionné"} - Filière: {theBody.filiere?.intitule ?? "non mentionné"} {"(" + (theBody.year ?? "non mentionné") + ")"}</small>
          <Input type="button" value="Ouvrir" onClick={() => n(`/layout/memoires/${theBody.id}/lecture`)} style={{ marginTop: "20px" }} />
        </Modal>
      </div>
    </>
  );
}
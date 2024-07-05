import { Button, Input, Select, Table } from 'antd';
import React from 'react';
import Alignement from './Alignement.tsx';

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

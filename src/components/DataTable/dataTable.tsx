import React from 'react';
import './dataTable.css';
import User from '../../types/userInterfaces';

interface IProps{
    data: User[] | null;
    title: string;
    fieldss:any[];
}

const DataTable:React.FC<IProps>=({data, fieldss, title}) =>{
  if (data == null) {
    return null;
  }
  const headerItems = fieldss.map( field => {
      let style = {
        flexBasis:'',
        maxWidth:''
      };
      if (field.width != null) {
          style.flexBasis = `${ field.width }rem`;
          style.maxWidth = `${ field.width }rem`;
      }
      return (
          <div className="DataTable__header-item" key={ field.key } style={ style }>
            { field.label }
          </div>
      );    
  });

  const bodyItems = data.map( (item, key) => {
      const fields = fieldss.map( field => {
          let style = {
            flexBasis:'',
            maxWidth:''
          };
          if (field.width) {
              style.flexBasis = `${ field.width }rem`;
              style.maxWidth = `${ field.width }rem`;
          }
          return (
              <div className="DataTable__body-item-field" key={ field.key } style={ style }>
                { item[field.key] }
              </div>
          );
      }); 
      return(
        <div className="DataTable__body-item" key={ key }>
          { fields }
        </div>
      );
  });

  let footerItems = null;
  return (
      <div className="DataTable">
      <header className="DataTable__header">
        { headerItems }
      </header>

      <div className="DataTable__body">
        { bodyItems }
      </div>

      <footer className="DataTable__footer">
        { footerItems }
      </footer>
    </div>
  );
}
export default DataTable;
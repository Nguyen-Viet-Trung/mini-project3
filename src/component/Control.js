import React, { Component, useState } from 'react';
function Control({onAddTask, onSearch, onSort}) {
  const handleAdd = () =>{
    onAddTask(true, 'Save',null);
  }
  const [keyword, setKeyword] = useState('');
  //hàm xử lý sự kiện tìm kiếm
  const handleSearch = () => {
    console.log("Keyword: "+keyword);
    onSearch(keyword)
  }
  const [sortField, setSortField] = useState('Name')
  const [sortBy, setSortBy] = useState('ASC')

  const handleSort = (sortField, sortBy) =>{
    setSortField(sortField);
    setSortBy(sortBy);
    onSort(sortField, sortBy);
  }
        return (
            <>
             <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for..."
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <span className="input-group-btn">
            <button className="btn btn-info" type="button" onClick={handleSearch}>
              Go!
            </button>
          </span>
        </div>
      </div>
      {/* SEARCH : END */}
      {/* SORT : START */}
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <div className="dropdown">
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sort by <span className="caret" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>
              <a role="button" onClick={() => handleSort('Name', 'ASC')}>Name ASC</a>
            </li>
            <li>
              <a role="button" onClick={() => handleSort('Name', 'DESC')}>Name DESC</a>
            </li>
            <li role="separator" className="divider" />
            <li>
              <a role="button" onClick={() => handleSort('Level', 'ASC')}>Level ASC</a>
            </li>
            <li>
              <a role="button" onClick={() => handleSort('Level', 'DESC')}>Level DESC</a>
            </li>
          </ul>
          <span className="label label-success label-medium">{sortField.toUpperCase()}-{sortBy}</span>
        </div>
      </div>
      {/* SORT : END */}
      {/* ADD : START */}
      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <button type="button" className="btn btn-info btn-block" onClick={handleAdd}>
          Add Task
        </button>
      </div>
      {/* ADD : END */}   
            </>
        );
    }

export default Control;
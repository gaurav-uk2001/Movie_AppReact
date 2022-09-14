// import React, {Component} from 'react';
// // import { get } from 'request';
// import {getMovies} from "./MovieService";

// class Movies extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             movies:getMovies(),
//             currSearchText:''
//         }
//     }

//     HandleDelete = (id)=>{
//         let filterArr=this.state.movies.filter((movieObj)=>{
//             return movieObj._id!==id;
//         });

//         this.setState({movies:filterArr});
//     }

//     HandleChange=(e)=>{
//         let val=e.target.value;
//         this.setState({currSearchText:val});
//         // let filteredMovies=[];
//         // if(val==''){
//         //     this.setState({filterMovies:this.state.movies,currSearchText:val});
//         //     // return;
//         // }
//         // else{
//         //     filteredMovies=this.state.movies.filter((movieObj)=>{
//         //         let movieName=movieObj.title.trim().toLowerCase();
//         //         return movieName.includes(val.toLowerCase());
//         //     })

//         //     this.setState({filterMovies:filteredMovies,currSearchText:val});
//         // }
//     }

//     render() { 
//         let val=this.state.currSearchText;
//         let filteredMovies=[];
//         if(val!==''){
//             filteredMovies=this.state.movies.filter((movieObj)=>{
//                 let movieName=movieObj.title.trim().toLowerCase();
//                 return movieName.includes(val.toLowerCase());
//             })
//         }
//         else{
//             filteredMovies=this.state.movies;
//         }
//         return (  
//             <div className="container">
//                 <div className="row">
//                     <div className="col-3">
//                         <h1>Hello</h1>
//                     </div>
//                     <div className="col-9">
//                         <input type="text" value={this.state.currSearchText} onChange={this.HandleChange} ></input>
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Title</th>
//                                     <th scope="col">Genre</th>
//                                     <th scope="col">Stock</th>
//                                     <th scope="col">Rate</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     filteredMovies.map( (movieObj)=>(
//                                         <tr scope="row" key={movieObj._id}>
//                                             <td>{movieObj.title}</td>
//                                             <td>{movieObj.genre.name}</td>
//                                             <td>{movieObj.numberInStock}</td>
//                                             <td>{movieObj.dailyRentalRate}</td>
//                                             <td><button onClick={()=>{this.HandleDelete(movieObj._id)}} type="button" className="btn btn-danger">Delete</button></td>
//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Movies;


import React, { Component } from 'react'
// css file import
import './Movies.css'
// import { getMovies } from './getMovies';
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            currSearchText: '',
            currPageNumber: 1,
            limit: 4,
            genres: [{ _id: "123", name: "All Genres" }],
            currGenre: "All Genres"
        }
    }

    async componentDidMount() {
        console.log("component did mount");
        let getMovies = await axios.get("https://backend-react-movie.herokuapp.com/movies");
        // console.log(getMovies);
        let allGenres = await axios.get("https://backend-react-movie.herokuapp.com/genres");
        // console.log(allGenres);
        this.setState({
            movies: [...getMovies.data.movies],
            genres: [...this.state.genres, ...allGenres.data.genres]
        })
    }
    handleChange = (e) => {
        let val = e.target.value;
        // console.log(val);
        this.setState({
            currSearchText: val
        })
    }
    onDelete = (id) => {
        let arr = this.state.movies.filter(function (movieObj) {
            return movieObj._id != id;
        })
        // console.log(arr);
        this.setState({
            movies: arr
        });
    }

    sortByStock = (e) => {
        let className = e.target.className;
        console.log(className);
        let moviesArr = this.state.movies;
        if (className == 'fa fa-sort-asc') {

            moviesArr.sort(function (movieObjA, movieObjB) {
                return movieObjA.numberInStock - movieObjB.numberInStock;
            });

        }
        else if (className == 'fa fa-sort-desc') {
            moviesArr.sort(function (movieObjA, movieObjB) {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            });
        }

        this.setState({ movies: moviesArr });

    }

    sortByRate = (e) => {
        let className = e.target.className;
        console.log(className);
        let moviesArr = this.state.movies;
        if (className == 'fa fa-sort-asc') {

            moviesArr.sort(function (movieObjA, movieObjB) {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
            });

        }
        else if (className == 'fa fa-sort-desc') {
            moviesArr.sort(function (movieObjA, movieObjB) {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            });
        }

        this.setState({ movies: moviesArr });

    }

    pageChangeHandle = (pageNum) => {
        // console.log("inpageHandler",pageNum);
        this.setState({ currPageNumber: pageNum });
    }

    handleLimit = (e) => {
        let className = e.target.className;
        let nlimit = 0;
        let currLimit = this.state.limit;
        if (className == 'up btn btn-success') {
            nlimit = currLimit + 1;
        }
        else if (className == 'down btn btn-danger') {
            nlimit = currLimit - 1;
        }

        this.setState({ limit: nlimit });
    }

    handleGenreChange = (genre) => {
        this.setState({ currGenre: genre });
    }



    render() {
        console.log('render');
        let { movies, currSearchText, currPageNumber, limit, genres, currGenre } = this.state; //ES6 destructuring

        let filteredArr = [];
        if (currSearchText == '') {
            filteredArr = movies;
        }
        else {
            filteredArr = movies.filter(function (movieObj) {
                let title = movieObj.title.toLowerCase();
                // console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        }
        if (currGenre != "All Genres") {
            filteredArr = filteredArr.filter((movieObj) => {
                return movieObj.genre.name == currGenre;
            })
        }
        // no. of movies per page
        // let limit=4; 
        // console.log(currPageNumber);
        let si = (currPageNumber - 1) * limit;
        let ei = si + limit;
        let numberOfPages = Math.ceil(filteredArr.length / limit);
        let numberOfPagesArr = [];
        for (let i = 1; i <= numberOfPages; i++) {
            numberOfPagesArr.push(i);
        }
        let moviesPerPage = filteredArr.slice(si, ei);
        // console.log(numberOfPagesArr);
        // console.log(this.state.genres)

        return (
            //JSX
            <>
                {
                    this.state.movies.length === 0 ?

                        <div id="loader" className="nfLoader"></div>

                        :
                        <div className='container'>


                            <div className='row'>
                                <div className='col-3'>
                                    <ul className="list-group" style={{ marginTop: "20vh", marginRight: "5vw" }}>
                                        {
                                            this.state.genres.map((genreObj) => {
                                                let className = this.state.currGenre == genreObj.name ? "list-group-item active" : "list-group-item";
                                                return (
                                                    <li key={genreObj._id} className={className} onClick={() => { this.handleGenreChange(genreObj.name) }} >{genreObj.name}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='col-9'>
                                    <div className="input-group mb-3" style={{ marginTop: "5vh", marginRight: "5vw" }}>
                                        <span className="input-group-text" id="inputGroup-sizing-default">Search Movies</span>
                                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={this.state.currSearchText} onChange={this.handleChange} />
                                    </div>
                                    <div class="input-group">
                                        <button class="up btn btn-success" type="button" onClick={this.handleLimit}>➕</button>

                                        <input type="text" value={this.state.limit} style={{ width: "30px", textAlign: "center" }} />
                                        <button class="down btn btn-danger" type="button" onClick={this.handleLimit}>➖</button>
                                    </div>
                                    {/* <input className="form-control me-2" type='search' value={this.state.currSearchText} onChange={this.handleChange} ></input> */}

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <i className="fa fa-sort-asc" onClick={this.sortByStock} aria-hidden="true"></i>
                                                    Stock
                                                    <i className="fa fa-sort-desc" onClick={this.sortByStock} aria-hidden="true"></i>
                                                </th>
                                                <th scope="col">
                                                    <i className="fa fa-sort-asc" onClick={this.sortByRate} aria-hidden="true"></i>
                                                    Rate
                                                    <i className="fa fa-sort-desc" onClick={this.sortByRate} aria-hidden="true"></i>
                                                </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                moviesPerPage.map((movieObj) => {
                                                    return (
                                                        <tr key={movieObj._id} >
                                                            <td></td>
                                                            <td>{movieObj.title}</td>
                                                            <td>{movieObj.genre.name}</td>
                                                            <td>{movieObj.numberInStock}</td>
                                                            <td>{movieObj.dailyRentalRate}</td>
                                                            <td><button onClick={() => {
                                                                this.onDelete(movieObj._id)
                                                            }} type="button" className="btn btn-danger">Delete</button></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    {/* pagination */}
                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            {
                                                numberOfPagesArr.map((pageNumber) => {

                                                    // console.log(pageNumber);
                                                    let className = pageNumber == currPageNumber ? "page-item active" : "page-item"
                                                    return (
                                                        <li key={pageNumber} className={className} onClick={() => { this.pageChangeHandle(pageNumber) }}><span className="page-link">{pageNumber}</span></li>
                                                    )

                                                })
                                            }
                                            {/* <li className="page-item"><span className="page-link">1</span></li>
                                <li className="page-item active" >
                                    <span className="page-link" aria-current="page">2</span>
                                </li>
                                <li className="page-item"><span className="page-link">3</span></li> */}

                                        </ul>
                                    </nav>



                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }
}
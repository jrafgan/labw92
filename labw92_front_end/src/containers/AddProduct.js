import React, {Component} from 'react';
import FormElement from "../components/UI/FormElement";
import {connect} from "react-redux";
import {createProduct, getCategories} from "../store/actions/productActions";
//import ImgButton from "../components/UI/ImgButton";
//import btnImg from "../assets/images/submit_btn.png"


class NewProduct extends Component {

    state = {
        title: '',
        description: '',
        category: '',
        price: 0,
        image: null,
    };

    componentDidMount() {
        if (this.props.user) {
            this.props.getCategories();
        } else {
            this.props.history.push('/');
        }
    }

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    selectChangeHandler = e => {
        console.log('category ; ', e.target.value);
        this.setState({
            category: e.target.value
        });
    };

    submitFormHandler = e => {
        e.preventDefault();

        if (this.state.image) {
            const formData = new FormData();
            Object.keys(this.state).forEach(key => {
                if (this.state[key] !== null) {
                    formData.append(key, this.state[key]);
                }
            });
            this.props.onSubmit(formData);
        } else {
            this.props.onSubmit(this.state)
        }
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    render() {
        return (
            <div className="product_add_div">
                <div className="comment_div">
                    <h2>Product</h2>

                    <form onSubmit={this.submitFormHandler} className="form">
                        <label htmlFor="category">Category</label>
                        <select id="category" onChange={this.selectChangeHandler} required>
                            <option value=''>--Choose category--</option>
                            {this.props.categories ? this.props.categories.map(item => {
                                return <option value={item._id} key={item._id}>{item.title}</option>
                            }) : null}
                        </select>
                        <FormElement
                            propertyName="title"
                            title="Title"
                            type="text"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                            placeholder="Enter product title"
                            error={this.getFieldError('title')}
                            style={this.props.error ? {"background": "red"} : null} />
                        <FormElement
                            propertyName="price"
                            title="Price"
                            type="number"
                            value={this.state.price}
                            onChange={this.inputChangeHandler}
                            placeholder="Enter product price"
                            error={this.getFieldError('price')}
                            style={this.props.error ? {"background": "red"} : null} />
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="textarea"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.inputChangeHandler}
                            style={this.props.error ? {"background": "red"} : null} />
                        {this.props.error &&
                        <div className="alert">
                            {this.getFieldError('description') || this.props.error.global}
                        </div>}

                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image" id="image"
                            onChange={this.fileChangeHandler}
                        />

                        <div>
                            <button type="submit" >Add product</button>
                            {/*<ImgButton src={btnImg} class="submit_btn" onClick={this.submitFormHandler} />*/}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.products.categories,
    error: state.products.error,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    onSubmit: formData => dispatch(createProduct(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
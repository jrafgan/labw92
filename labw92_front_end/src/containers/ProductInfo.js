import React, {Component} from 'react';
import {getCategories, getProductById} from "../store/actions/productActions";
import connect from "react-redux/es/connect/connect";
import {NavLink} from "react-router-dom";
import ImgThumbnail from "../components/UI/ImgThumbnail";

class ProductInfo extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        this.props.getProduct(id);
        this.props.getCategories();
    }

    render() {
        return (
            <div className="App">
                <div className="categories_div">
                    <p>Categories</p>
                    {this.props.categories ? this.props.categories.map(item => <NavLink to={"/category/" + item._id}
                                                                                        key={item._id}>{item.title}</NavLink>
                    ) : null}
                </div>
                {this.props.product.category ? <div className="product_info_div">
                    <ImgThumbnail image={this.props.product.image} alt={this.props.product.title} class="img_full_info"/>
                    <p>Категория : {this.props.product.category.title}</p>
                    <p>{this.props.product.title}</p>
                    <p>{this.props.product.price} сом</p>
                    <p>{this.props.product.description}</p>
                    <p>Контактный телефон : {this.props.product.user.phoneNumber}</p>
                    <p>Продавец : {this.props.product.user.displayName}</p>
                    {this.props.product.user.displayName === this.props.user.displayName ? <button>Delete</button> : null}
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.products,
    categories: state.products.categories,
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    getProduct: id => dispatch(getProductById(id)),
    getCategories: () => dispatch(getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
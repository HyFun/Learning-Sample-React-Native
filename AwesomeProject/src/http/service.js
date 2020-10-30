import http from './request';

export default {
  /**
   * 获取banner列表
   */
  getBanner() {
    return http.get('/banners');
  },
  /**
   * 获取文章分类
   */
  getArticleClass() {
    return http.get('/categories/Article');
  },
  /**
   * 获取妹子列表 https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10
   */
  getGirlList(pageIndex, pageSize) {
    return http.get(
      `/data/category/Girl/type/Girl/page/${pageIndex}/count/${pageSize}`,
    );
  },
};

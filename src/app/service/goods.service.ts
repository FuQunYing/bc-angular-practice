import { Injectable , Inject} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class GoodsService {
      private headers = new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'x-access-token': localStorage.getItem('t')
      });
      constructor(@Inject('BASE_CONFIG') private config, private http: Http) { }
      /**
       * 获取所有商品
       * @returns {Promise<any>}
       */
      getAllGoods(): Promise<any> {
            const body = {
                  'data': {
                        'userid': localStorage.getItem(`userid`),
                        'page': 0,
                        'pageSize': 10
                  },
                  'sige': '1234'
            };
            console.log(JSON.stringify(body));
            const uri = `${this.config.uri}/goods/query`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers : this.headers})
                              .toPromise();
      }
      /**
       * 创建商品
       * @param good
       * @returns {Promise<any>}
       */
      createGoods(good: any): Promise<any> {
            const body = {
                  'data': {
                        'userid' : localStorage.getItem(`userid`),
                        'goods_name': good.goods_name,
                        'price' : Number(good.price * 100),
                        'description': good.description,
                        'pic': good.img,
                        'tag': good.tag ? good.tag : ''
                  },
                  'sign': '1234'
            };
            console.log(JSON.stringify(body));
            const uri = `${this.config.uri}/goods/create`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
      /**
       * 更新商品
       * @param good
       * @returns {Promise<any>}
       */
      updateGoods(good: any): Promise<any> {
            const body = {
                  'data' : {
                        'userid': localStorage.getItem(`userid`),
                        'id': good.id_t,
                        'goods_name': good.goods_name.t,
                        'price': Number(good.price_t * 100),
                        'description': good.description_t,
                        'tag': good.tag_t ? good.tag_t : '默认'
                  },
                  'sign': '1234'
            };
            console.log(JSON.stringify(body));
            const uri = `${this.config.uri}/goods/update`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
      /**
       * 获取模板
       * @param {Array<number>} template
       * @returns {Promise<any>}
       */
      getTemplate(template?: Array<number>): Promise<any> {
            const body = {
                  'data': {
                        'userid': localStorage.getItem(`userid`),
                        'template': template ? template : []
                  },
                  'sign': '1234'
            };
            const uri = `${this.config.uri}/template/query`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
      /**
       * 创建模板
       * @returns {Promise<any>}
       */
      createTemplate(): Promise<any> {
            const body = {
                  'data': {
                        'userid': localStorage.getItem(`userid`)
                  },
                  'sign': '1234'
            };
            const uri = `${this.config.uri}/template/create`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
      /**
       * 模板删除
       * @param {number} id
       * @returns {Promise<any>}
       */
      delTemplate(id: number): Promise<any> {
            const body = {
                  'data': {
                        'userid': localStorage.getItem(`userid`),
                        'template': id
                  },
                  'sign': '1234'
            };
            const uri = `${this.config.uri}/template/del`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
      /**
       * 模板绑定APPID
       * @param {number} id
       * @param {string} appid
       * @returns {Promise<any>}
       */
      bindingTA(id: number, appid: string): Promise<any>{
            const body = {
                  'data': {
                        'userid': localStorage.getItem(`userid`),
                        'template': id,
                        'appid': appid
                  },
                  'sign': '1234'
            } ;
            const uri = `${this.config.uri}/template/band`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
      /**
       * 创建模板菜
       * @param {object} o
       * @returns {Promise<any>}
       */
      createChannel(o: any): Promise<any>{
            const body = {
                  'data': {
                        'userid': localStorage.getItem(`userid`),
                        'template': o.template,
                        'num': Number(o.num),
                        'name': o.name
                  },
                  'sign': '1234'
            };
            const uri = `${this.config.uri}/template/channel/create`;
            return this.http
                              .post(uri, JSON.stringify(body), {headers: this.headers})
                              .toPromise();
      }
}

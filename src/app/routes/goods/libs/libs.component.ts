import {NzModalService} from 'ng-zorro-antd';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoodsService} from '../../../service/goods.service';
import {FileUploader} from 'ng2-file-upload';
import {NzModalComponent} from 'ng-zorro-antd/src/modal/nz-modal.component';

@Component({
  selector: 'app-libs',
  templateUrl: './libs.component.html',
  styleUrls: ['./libs.component.scss']
})
export class LibsComponent implements OnInit {
  goods: any;
  good_tmp: any;
  loading: Boolean = false;
  sloading: Boolean = false;
  end: Boolean = false;
  totop: Boolean = false;
  i: any = 0;
  count: any;

  isVisible: Boolean = false;
  isVisible_edit: Boolean = false;
  isConfirmLoading: Boolean = false;
  isConfirmLoading_t: Boolean = false;
  validateForm: FormGroup;
  validateForm_t: FormGroup;
  delConfirm: Boolean = false;

// 文件上传
  imgurl: string;
  uploader: FileUploader = new FileUploader({
    url: 'api/goods/upload',
    isHTML5: true,
    allowedMimeType: ['image/jpeg', 'image/png']
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  files: any[] = [];

  getInit() {
    this.goodsService.getAllGoods(this.i)
      .then(res => {
        this.goods = res.json().result.data;
        this.count = res.json().result.count;
        // console.log(res.json());
        // console.log(this.goods);
        this.loading = res.json().result.data.length > 0 ? true : false;
      });
  }

  scroll() { // 滚动到底自动加载下一页
    function getScrollTop() {// 获取滚动条当前的位置
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    }

    function getClientHeight() { // 获取当前可视范围的高度
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
      }
      return clientHeight;
    }

    function getScrollHeight() { // 获取文档完整的高度
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    window.onscroll = () => {
      if (getScrollTop() + getClientHeight() >= getScrollHeight()) {
        console.log('到底了');
        this.totop = true;
        if (this.goods) {
          if (this.goods.length < this.count) {
            this.sloading = true;
            this.i += 12;
            this.goodsService.getAllGoods(this.i)
              .then(res => {
                for (let i = 0; i < res.json().result.data.length; i++) { // 遍历新获取到的数据数组，push到goods后
                  this.goods.push(res.json().result.data[i]);
                }
                this.sloading = false;
                console.log(this.sloading, this.goods);
              });
          } else {
            this.end = true;
          }
        }
      } else {
        this.totop = false;
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  uploadFile() {
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status === 200) {
        // 上传文件后后去服务器返回的数据
        const tempRes = JSON.parse(response);
        this.imgurl = tempRes.result.url;
        localStorage.setItem('img', tempRes.result.url);
        console.log(tempRes);
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('....');
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  showModal() {
    this.isVisible = true;
  }

  showEditModal(good: any) {
    this.isVisible_edit = true;
    this.good_tmp = good;
    this.good_tmp.price2 = (this.good_tmp.price / 100).toFixed(2);
    console.log(good);
  }

  handleOk() {
    this.isConfirmLoading = true;
    /*     for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    } */
    this.validateForm.value.img = localStorage.getItem('img');
    console.log(this.validateForm.value); // 无法通过赋值为空来清空
    if (this.validateForm.value.img) {
      this.goodsService.createGoods(this.validateForm.value)
        .then(res => {
          console.log(res);
          this.isVisible = false;
          this.isConfirmLoading = false;
          this.i = 0;
          this.getInit();
          this.uploader.clearQueue(); // 调用一次clear，清除上一次上传保存下来的图片信息，还是不要用比较好
          localStorage.removeItem('img'); // 清除保存在localStorage里的img值，不影响下一次提交选择
        });
    } else {
      alert('请上传图片');
    }
  }

  handleCancel(e) {
    this.isVisible = false;
  }

  editOk() {
    this.isConfirmLoading_t = true;
    this.validateForm_t.value.img_t = localStorage.getItem('img');
    console.log(this.validateForm_t.value);
    this.goodsService.updateGoods(this.validateForm_t.value)
      .then(res => {
        console.log(`获取结果为${res}`);
        this.isVisible_edit = false;
        this.isConfirmLoading_t = false;
        this.good_tmp = null;
        this.i = 0;
        this.getInit();
        this.uploader.clearQueue(); // 调用一次clear，清除上一次上传保存下来的图片信息
        localStorage.removeItem('img'); // 清除保存在localStorage里的img值，不影响下一次提交选择
      });
  }

  editCancel(e) {
    this.isVisible_edit = false;
    this.good_tmp = null;
  }

  goodsDel(good: any) {
    this.modelService.confirm({
      'title': '您确认删除该商品吗？',
      onOk: () => {
        this.goodsService.delGoods(good)
          .then(res => {
            console.log(res);
            this.i = 0;
            this.getInit();
          });
      },
      onCancel() {
      }
    });
  }

  constructor(private goodsService: GoodsService,
              private modelService: NzModalService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    /**
     * 获取所有商品列表
     */
    this.getInit();
    /**
     * 表单验证
     * @type {FormGroup}
     */
    this.validateForm = this.fb.group({
      goods_name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      tag: [null],
      description: [null, [Validators.required]],
      img: [null]
    });
    this.validateForm_t = this.fb.group({
      id_t: [null, [Validators.required]],
      goods_name_t: [null, [Validators.required]],
      price_t: [null, [Validators.required]],
      tag_t: [null],
      description_t: [null, [Validators.required]],
      img_t: [null]
    });
    /**
     * 文件上传
     * @param {FileItem} f
     * @returns {FileItem}
     */
    this.uploader.onAfterAddingFile = (f) => {
      this.files = this.uploader.queue;
      return f;
    };
    // 滚动
    this.scroll();
  }

  selectedFileOnChanged(event: any) {
    // 打印文件选择名称
    console.log(event.target.value);
  }

  toTop(event) {
    event.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.totop = false;
  }
}

<template>
	<div>
		<h1>게시판 상세보기</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td>{{subject}}</td>
					</tr>
					<tr>
						<th>내용</th>
						<td class="txt_cont" v-html="cont"></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
            <a href="javascript:;" @click="fnMod" class="btnAdd btn">수정</a>
		</div>	
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			body:this.$route.query
			,subject:''
			,cont:''
			,view:''
			,num:this.$route.query.num
		}
	}
	,mounted() {
		this.fnGetView();
	}
	,methods:{
		fnGetView() {
			axios.get('http://localhost:3000/api/board/'+this.body.num,{params:this.body})
			.then((res)=>{
				this.view = res.data.view[0];
				this.subject = this.view.subject;
				this.cont = this.view.cont.replace(/(\n)/g,'<br/>');
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnList(){ 
			delete this.body.num;
			this.$router.push({path:'./list',query:this.body});
		}
        ,fnMod() {
			this.$router.push({path:'./write',query:this.body}); //등록화면으로 이동하면서 파라미터를 넘겨준다.
		}
	}
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th{border:1px solid gray; padding:5px 0; }
    .tbAdd td{border:1px solid gray; padding:5px 0; }
	.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left  }
	.tbAdd td.txt_cont{height:300px; vertical-align:top solid;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>
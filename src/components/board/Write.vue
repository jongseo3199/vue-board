<template>
	<div>
		<h1>게시판 {{num ? '수정':'등록'}}</h1> <!-- num 값에 따라 제목 변경 -->

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td>
                        <!-- v-model 양뱡향데이터전송으로 상세 데이터 넣어준다 -->
                        <input type="text" v-model="subject" ref="subject" /></td>
					</tr>
					<tr>
						<th>내용</th>
						<td><textarea v-model="cont" ref="cont"></textarea></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
			<a v-if="!num" href="javascript:;" @click="fnAddProc" class="btnAdd btn">등록</a>
			<a v-else href="javascript:;" @click="fnModProc" class="btnAdd btn">수정</a>
		</div>	
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() { //변수 생성
		return{
			board_code:'news'
			,subject:''
			,cont:''
			,id:'admin'
			,body:this.$route.query 
			,form:'' //form 전송 데이터
			,num:this.$route.query.num
		}
	}
	,mounted() { //  최초 로딩시 실행

		if(this.num) { // num 값이 있으면 상세 데이터 출력
			this.fnGetView();
		}
	}
	,methods:{
		fnList(){ //리스트 화면으로 이동 함수
			delete this.body.num;
			this.$router.push({path:'./list',query:this.body});
			
		}
		,fnGetView() {
			axios.get('http://localhost:3000/api/board/'+this.body.num,{params:this.body})
			.then((res)=>{
				this.view = res.data.view[0];
				this.subject = this.view.subject;
				this.cont = this.view.cont;
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnView() {
			this.$router.push({path:'./view',"query":this.body});
		}	
		,fnAddProc() { //등록 프로세스
			if(!this.subject) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.subject.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			if(!this.cont) {
				alert("내용을 입력해 주세요");
				this.$refs.cont.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			this.form = { //backend로 전송될 POST 데이터
				board_code:this.board_code
				,subject:this.subject
				,cont:this.cont
				,id:this.id
			} 
			
			axios.post('http://localhost:3000/api/board',this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					this.fnList();
				} else {
					alert("실패하였습니다. 다시 시도해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
			
		}
		,fnModProc() { // 수정
			if(!this.subject) {
				alert("제목을 입력해 주세요");
				this.$refs.subject.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			if(!this.cont) {
				alert("내용을 입력해 주세요");
				this.$refs.cont.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			this.form = {
				board_code:this.board_code
				,subject:this.subject
				,cont:this.cont
				,id:this.id
				,num:this.num
			} 
			
			axios.put('http://localhost:3000/api/board',this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('수정되었습니다.');
					this.fnView();
				} else {
					alert("실패했습니다.다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
	}	
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>
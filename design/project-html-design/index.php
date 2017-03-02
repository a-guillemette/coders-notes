<!DOCTYPE html>
<html lang="en">

<head>
	<?php include('./php/modules/head.php'); ?>
	<title>Coder's Notes</title>
	<link href="./css/index.css" rel="stylesheet">
</head>

<body>
	<nav class="navbar navbar-inverse navbar-static-top bars">
		<div class="container-fluid">
			<div class="navbar-header">
			</div>
			<ul class="nav navbar-nav">
				<li>
					<a href="#menu-toggle" id="menu-toggle">
						<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
					</a>
				</li>
				<li>
					<p class="navbar-text page-title">Coder's Notes</p>
					<img class="logo" src="./resources/code-icon.png" alt="image not available">
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li>
					<a href="#"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></a>
				</li>
				<li>
					<a href="#"><span class="glyphicon glyphicon-th" aria-hidden="true"></span></a>
				</li>
				<li>
					<a href="#"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
				</li>
				<li>
					<a href="#">Sign out</span></a>
				</li>
				<li>
					<a href="#" id="log-in">Sign in</span></a>
				</li>
				<li>
					<a href="#" id="create-account">Register</span></a>
				</li>
			</ul>

			<form class="navbar-form navbar-right">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Search for...">
					<span class="input-group-btn">
	        				<button class="btn btn-default" type="button">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					</span>
				</div>
			</form>
		</div>
	</nav>
	<div id="wrapper">
		<div id="sidebar-wrapper" class="bars">
			<ul class="sidebar-nav">
				<li>
					<a href="#">
						<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span>
						<span class="sidebar-link-text">Pinned</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
						<span class="sidebar-link-text">Notes</span>
					</a>
				</li>
				<li><hr></li>
				<li>
					<a href="#">
						<span class="sidebar-link-text">Labels
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</span>
					</a>

					<a href="#" class="nested-links">
						<span class="glyphicon glyphicon-tags" aria-hidden="true"></span>
						<span class="sidebar-link-text">Cras justo odio</span>
					</a>
					<a href="#" class="nested-links">
						<span class="glyphicon glyphicon-tags" aria-hidden="true"></span>
						<span class="sidebar-link-text">Dapibus ac</span>
					</a>
					<a href="#" class="nested-links">
						<span class="glyphicon glyphicon-tags" aria-hidden="true"></span>
						<span class="sidebar-link-text">Morbi leo risus</span>
					</a>
				</li>
				<li><hr></li>
				<li>
					<a href="#">
						<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
						<span class="sidebar-link-text">Archive</span>
					</a>
				</li>
				<li>
					<a href="#">
						<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
						<span class="sidebar-link-text">Thrash</span>
					</a>
				</li>
			</ul>
		</div>
		<!-- PAGE CONTENT -->
		<div id="page-content-wrapper">
			<div class="floating-button">
				<a id="create-note" href="#create-note">
					<span class="glyphicon glyphicon-plus-sign button-color" aria-hidden="true"></span>
				</a>
			</div>

			<div class="container">
				<div class="child">
					<h4>Title somewhat long omg wtf im gay</h4>
					<p>Lorem ipsum dolor sit amet, quo doming electram ei, ex mea atomorum deseruisse moderatius, inermis hendrerit vis no. Gubergren abhorreant te has. Vero ubique, est at detracto scribentur. In odio putant legendos vim, mea elit eius ei. Legendos partiendo ut nam. Usu id utamur admodum offendit.At usu malorum theophrastus, vim no splendide sadipscing. No sit repudiare constituam. An duo mentitum abhorreant, ex dico etiam omittantur vix, duo dicit impedit pericula no. Sit id aeterno dolorum epicurei, ubique deleniti eam ad.Nulla nullam praesent ei his, nec ne animal malorum. Ea his eirmod timeam, usu ex suas facete perpetua, per mazim movet partiendo no. At mei case nihil facilisi. Mea docendi accommodare no.</p>
					<img src="./resources/uploaded/capture1.png" alt="">
				</div>
				<div class="child">
					<h4>Title somewhat long omg wtf im gay</h4>
					<p>Lorem ipsum dolor sit amet, quo doming electram ei, ex mea atomorum deseruisse moderatius, inermis hendrerit vis no.</p>
					<pre class="prettyprint">var lol = shit;
					</pre>
				</div>
				<div class="child">
					<h4>Title somewhat long omg wtf im gay</h4>
					<p>Lorem ipsum dolor sit amet, quo doming electram ei, ex mea atomorum deseruisse moderatius, inermis hendrerit vis no. Gubergren abhorreant te has. In quo vitae quidam fastidii. An mutat tempor facilis eos.Ad qui modo delicatissimi, graeci recteque ad mei. In usu scaevola adipiscing eloquentiam, id lorem doctus sit. Ad pro vero ubique, est at detracto scribentur. In odio putant legendos vim, mea elit eius ei. Legendos partiendo ut nam. Usu id utamur admodum offendit.At usu malorum theophrastus, vim no splendide sadipscing. No sit repudiare constituam. An duo mentitum abhorreant, ex dico etiam omittantur vix, duo dicit impedit pericula no. Sit id aeterno dolorum epicurei, ubique deleniti eam ad.Nulla nullam praesent ei his, nec ne animal malorum. Ea his eirmod timeam, usu ex suas facete perpetua, per mazim movet partiendo no. At mei case nihil facilisi. Mea docendi accommodare no. Alii illud nam in, vis ea nonumy ornatus placerat. Pri feugait placerat assueverit ad, duo inermis lobortis sadipscing an.Vero inimicus mediocrem mel in, vel eu postea abhorreant, usu ei admodum conceptam. Eu ius docendi dissentias. His ea iisque appareat, ei eos nisl harum causae. Quodsi partiendo consequat et vix, ea mentitum expetenda referrentur vix. Et quem nemore integre has, in fugit oporteat rationibus his.</p>
				</div>
			</div>
		</div>
	</div>

	<?php include('./php/modules/script.php'); ?>
	<!-- Custom JS -->
	<script src="./js/index.js"></script>
</body>

</html>

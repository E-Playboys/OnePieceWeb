using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OnePiece.Web.Data.Migrations
{
    public partial class UpdateTableNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MangaChapters_MangaSeasons_MangaSeasonId",
                table: "MangaChapters");

            migrationBuilder.DropTable(
                name: "MangaSeasons");

            migrationBuilder.DropColumn(
                name: "PublishedDate",
                table: "MangaChapters");

            migrationBuilder.RenameColumn(
                name: "MangaSeasonId",
                table: "MangaChapters",
                newName: "MangaVolumeId");

            migrationBuilder.RenameIndex(
                name: "IX_MangaChapters_MangaSeasonId",
                table: "MangaChapters",
                newName: "IX_MangaChapters_MangaVolumeId");

            migrationBuilder.CreateTable(
                name: "MangaVolumes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Avatar = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    CreatedUserId = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Number = table.Column<int>(nullable: false),
                    PublishedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MangaVolumes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MangaVolumes_AspNetUsers_CreatedUserId",
                        column: x => x.CreatedUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MangaVolumes_CreatedUserId",
                table: "MangaVolumes",
                column: "CreatedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MangaChapters_MangaVolumes_MangaVolumeId",
                table: "MangaChapters",
                column: "MangaVolumeId",
                principalTable: "MangaVolumes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MangaChapters_MangaVolumes_MangaVolumeId",
                table: "MangaChapters");

            migrationBuilder.DropTable(
                name: "MangaVolumes");

            migrationBuilder.RenameColumn(
                name: "MangaVolumeId",
                table: "MangaChapters",
                newName: "MangaSeasonId");

            migrationBuilder.RenameIndex(
                name: "IX_MangaChapters_MangaVolumeId",
                table: "MangaChapters",
                newName: "IX_MangaChapters_MangaSeasonId");

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedDate",
                table: "MangaChapters",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MangaSeasons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Avatar = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    CreatedUserId = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Number = table.Column<int>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MangaSeasons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MangaSeasons_AspNetUsers_CreatedUserId",
                        column: x => x.CreatedUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MangaSeasons_CreatedUserId",
                table: "MangaSeasons",
                column: "CreatedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_MangaChapters_MangaSeasons_MangaSeasonId",
                table: "MangaChapters",
                column: "MangaSeasonId",
                principalTable: "MangaSeasons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

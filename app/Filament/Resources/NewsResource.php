<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Filament\Resources\NewsResource\RelationManagers;
use App\Models\News;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('author_id')
                    ->relationship('author','name')
                    ->required(),
                Forms\Components\Select::make('news_category_id')
                    ->relationship('newsCategory','title')
                    ->required(),
                Forms\Components\TextInput::make('title')
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state)))
                    ->required(),
                Forms\Components\TextInput::make('slug')
                    ->readOnly(),
                Forms\Components\fileUpload::make('thumbnail')
                    ->image()
                    ->required(),
                Forms\components\RichEditor::make('content')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('is_published'),
                Forms\Components\Select::make('page')
                    ->options([
                        'olahraga' => 'Olahraga',
                        'lifestyle' => 'Lifestyle',
                        'business' => 'Business',
                        'terkini' => 'Terkini',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('author.name'),
                Tables\Columns\TextColumn::make('newsCategory.title'),
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\TextColumn::make('thumbnail')
            ])
            ->filters([
                Tables\Filters\selectFilter::make('author_id')
                    ->relationship('author','name'),
                Tables\Filters\selectFilter::make('news_category_id')
                    ->relationship('newsCategory','title'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
